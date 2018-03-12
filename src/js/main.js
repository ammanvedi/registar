window.Registar = {};


( function( registar ) {

    var DEFAULT_CONFIG = {
        validClass: 'registar-input--complete',
        placeholderClass: 'registar-input--placeholder',
    };

    /**
     * [_validateInput description]
     * @return {[type]} [description]
     */
    var _validateInput = function() {
        var _self = this;

        if( !_self.config.pattern ) {
            return true;
        }

        return new RegExp( _self.config.pattern ).test( _self.element.innerText );
    }

    /**
     * [_validate description]
     * @return {[type]} [description]
     */
    var _validate = function() {
        var _self = this;

        if( !_self.element.innerText ) {
            return;
        }

        var isValid = _validateInput.call( _self );
        if( isValid ) {
            _self.element.classList.add( _self.config.validClass );
        } else {
            _self.element.classList.remove( _self.config.validClass );
        }

    }

    /**
     * [_addPlaceholder description]
     */
    var _addPlaceholder = function() {
        var _self = this;

        if( _self.element.innerText || !_self.config.placeholder ) {
            return;
        }

        _self.element.innerText = _self.config.placeholder;
        return _self.element.offsetWidth;
    }

    /**
     * [_listen description]
     * @return {[type]} [description]
     */
    var _listen = function() {
        var _self = this;

        _self.element.addEventListener( 'change', eventObj => {
             _validate.call( _self );
             _addPlaceholder.call( _self );
        } );

        _self.element.addEventListener( 'blur', eventObj => {
             _validate.call( _self );
             _addPlaceholder.call( _self );
        } );

        _self.element.addEventListener( 'focus', eventObj => {
            if( _self.element.innerText === _self.config.placeholder ) {
                _self.element.style.minWidth = _self.minWidth + 'px';
                _self.element.innerText = '';
            }
        } );
    }

    /**
     * [InputElement description]
     * @param {[type]} element [description]
     * @param {[type]} config  [description]
     */
    registar.InputElement = function( element, config ) {
        var _self = this;

        _self.element = element;
        _self.config = Object.assign( {}, DEFAULT_CONFIG, {
            pattern: _self.element.getAttribute( 'data-pattern' ),
            type: _self.element.getAttribute( 'data-type' ),
            placeholder: _self.element.getAttribute( 'data-placeholder' )
        }, config || {} );

        _listen.call( _self );
        _self.minWidth = _addPlaceholder.call( _self );

    }

    document.querySelectorAll( '.js-registar-input' ).forEach( element => {
        new window.Registar.InputElement( element );
    } );

} )( window.Registar );


( function( registar ) {

    var _listen = function() {
        var _self = this;

        _self.select.addEventListener( 'change', eventObject => {
            _self.current.innerText = _self.select.options[ _self.select.selectedIndex ].label;
        } );
    }

    /**
     * [InputElement description]
     * @param {[type]} element [description]
     * @param {[type]} config  [description]
     */
    registar.SelectElement = function( element, config ) {
        var _self = this;

        _self.element = element;
        _self.select = element.querySelector( '.js-select-element' );
        _self.current = element.querySelector( '.js-select-current' );
        _self.config = {
            placeholder: _self.select.getAttribute( 'placeholder' )
        }
        _self.current.innerText = _self.config.placeholder;
        _listen.call( _self );

    }

    document.querySelectorAll( '.js-registar-input-select' ).forEach( element => {
        new window.Registar.SelectElement( element );
    } );

} )( window.Registar );


( function( registar ) {


    /**
     * [InputElement description]
     * @param {[type]} element [description]
     * @param {[type]} config  [description]
     */
    registar.Section = function( element ) {
        var _self = this;

        _self.element = element;
        _self.config = {
            outClass: 'registar__section--out',
            inClass: 'registar__section--in'
        };


    }

    registar.Section.prototype.in = function() {
        var _self = this;
        _self.element.classList.remove( _self.config.outClass );
        _self.element.classList.add( _self.config.inClass );
    }

    registar.Section.prototype.out = function() {
        var _self = this;
        _self.element.classList.remove( _self.config.inClass );
        _self.element.classList.add( _self.config.outClass );
    }

} )( window.Registar );


( function( registar ) {

    var _listen = function() {
        var _self = this;

        _self.nextButton.addEventListener( 'click', eventObj => {
            _next.call( _self );
        } );
    }

    var _previous = function() {
        var _self = this;

        var current = _self.sections[ _self.index ];
        var previous = _self.sections[ _self.index - 1 ];

        if( current && previous ) {
            current.out();
            previous.in();
            _self.index--;
        }
    }

    var _next = function() {
        var _self = this;

        var current = _self.sections[ _self.index ];
        var next = _self.sections[ _self.index + 1 ];

        if( current && next ) {
            current.out();
            next.in();
            _self.index++;
        }
    }


    /**
     * [InputElement description]
     * @param {[type]} element [description]
     * @param {[type]} config  [description]
     */
    registar.Main = function( element ) {
        var _self = this;

        _self.element = element;
        _self.index = 0;
        _self.sections = Array.prototype.slice.call( _self.element.querySelectorAll( '.js-section' ) ).map( section => {
            return new registar.Section( section );
        } );
        _self.nextButton = _self.element.querySelector( '.js-next' );
        _listen.call( _self );
    }

    document.querySelectorAll( '.js-registar' ).forEach( element => {
        new window.Registar.Main( element );
    } );

} )( window.Registar );
