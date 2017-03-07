'use strict';

const join = require('path').join;
const test = require('tape');
const Fly = require('fly');

const dir = join(__dirname, 'fixtures');
const tmp = join(__dirname, '.tmp');

test('fly-flatten', t => {
	t.plan(10);

	const src = `${dir}/**/*.js`;

	const fly = new Fly({
		plugins: [
			require('fly-clear'),
			require('../')
		],
		tasks: {
			*a(f) {
				f.emit = (evt, obj) => {
					if (evt === 'plugin_warning') {
						t.pass('emits plugin warning if no source files');
						t.ok(/source files/i.test(obj.warning), 'informs user with message');
					}
				};

				yield f.source(`${dir}/*.foo`).flatten().target(tmp);
			},
			*b(f) {
				// default (level: 0)
				yield f.source(src).flatten().target(tmp);
				const arr = yield f.$.expand(`${tmp}/*`);
				t.equal(arr.length, 7, '(level:0) flatten all files to same directory');
				yield f.clear(tmp);
			},
			*c(f) {
				yield f.source(src).flatten({ levels: 1 }).target(tmp);
				const arr1 = yield f.$.expand(`${tmp}/*`);
				const arr2 = yield f.$.expand(`${tmp}/*.js`);
				t.equal(arr1.length - arr2.length, 3, '(level:1) creates 1 file and 3 subdirs');
				const arr3 = yield f.$.expand(`${tmp}/bar/*`);
				t.equal(arr3.length, 2, '(level:1) deeply-nested subdirs are moved');
				yield f.clear(tmp);
			},
			*d(f) {
				yield f.source(`${dir}/foo/**/*.js`).flatten({ levels: 2 }).target(tmp);
				const arr1 = yield f.$.expand(`${tmp}/*`);
				const arr2 = yield f.$.expand(`${tmp}/*.js`);
				t.equal(arr1.length - arr2.length, 1, '(level:2) creates 1 file and 1 subdir');
				const arr3 = yield f.$.expand(`${tmp}/bar/*`);
				const arr4 = yield f.$.expand(`${tmp}/bar/*.js`);
				t.equal(arr3.length - arr4.length, 1, '(level:2) creates 2 files and 1 subdir within `baz`');
				const arr5 = yield f.$.expand(`${tmp}/bar/baz/*`);
				t.equal(arr5.length, 3, '(level:2) creates all 3 files within 2nd subdir level');
				yield f.clear(tmp);
			},
			*e(f) {
				// allowed `levels` is deeper than source tree
				yield f.source(src).flatten({ levels: 5 }).target(tmp);
				const arr1 = yield f.$.expand(`${tmp}/*`);
				const arr2 = yield f.$.expand(`${tmp}/foo/bar/baz/*.js`);
				t.true(arr1.length === 2 && arr2.length === 3,'(level:5) copy folder structure');
				yield f.clear(tmp);
			}
		}
	});

	t.ok('flatten' in fly.plugins, 'add the `flatten` plugin');

	fly.serial(['a', 'b', 'c', 'd', 'e']);
});
