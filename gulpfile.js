const { src, dest, watch } = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const merge = require('gulp-merge-json');
const fs = require('fs');
const { spawnSync } = require('child_process');

const compile_pug = () => {
  // concat_json();
  const json_str = fs.readFileSync('./src/combined.json', 'utf-8');
  const json_data = JSON.parse(json_str);

  return src('./src/[!_]*.pug')
    .pipe(
      pug({
        doctype: 'html',
        pretty: true,
        data: json_data,
      })
    )
    .pipe(dest('./public'));
};

const compile_scss = () => {
  return src('./src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./public/css'));
};

const merge_json = () => {
  return src('./src/data/**/*.json')
    .pipe(
      merge({
        fileName: 'combined.json',
      })
    )
    .pipe(dest('./src'));
};

const devWatch = () => {
  watch('./src/data/**/*.json', merge_json);
  watch('./src/**/*.pug', compile_pug);
  watch('./src/**/*.scss', compile_scss);
};

/* -------------------------------------------- */

const build_pug = () => {
  const json_str = fs.readFileSync('./src/combined.json', 'utf-8');
  const json_data = JSON.parse(json_str);

  return src('./src/[!_]*.pug')
    .pipe(
      pug({
        doctype: 'html',
        pretty: false,
        data: json_data,
      })
    )
    .pipe(dest('./public'));
};

const build_scss = () => {
  return src('./src/scss/style.scss')
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(dest('./public/css'));
};

const build = async () => {
  await build_pug();
  await build_scss();
};

exports.default = devWatch;
exports.build = build;
exports.json = merge_json;
