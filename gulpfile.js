const gulp = require( 'gulp' );
const concat = require( 'gulp-concat' );
const sass = require( 'gulp-sass' );
const autoprefixer = require( 'gulp-autoprefixer' );

const config = {
  src: {
    sass: 'src/styles/registar.scss',
    html: 'src/index.html',
    js: 'src/js/**/*.js',
    svg: 'src/svg/**/*.svg'
  },
  dist: {
    directory: './dist/',
    svgDirectory: './dist/svg',
  }
};

gulp.task( 'html', () => {
  return gulp.src( config.src.html )
          .pipe( gulp.dest( config.dist.directory ) );
} );

gulp.task( 'js', () => {
  return gulp.src( config.src.js )
          .pipe( gulp.dest( config.dist.directory ) );
} );

gulp.task( 'svg', () => {
  return gulp.src( config.src.svg )
          .pipe( gulp.dest( config.dist.svgDirectory ) );
} );

gulp.task( 'css', () => {
  return gulp.src( config.src.sass )
          .pipe( sass() )
          .pipe(autoprefixer({
              browsers: [ 'last 2 versions' ],
              cascade: false
          }))
          .pipe( gulp.dest( config.dist.directory ) );

} );

gulp.task( 'default', [ 'html', 'css', 'js', 'svg' ] );
