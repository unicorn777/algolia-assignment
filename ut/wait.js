/*
 * This UT tests retrieving of job results through q.wait method
 */
console.log('Testing wait method');
const qyu = require('../qyu');

const q = qyu({
  rateLimit: 50, // maximum number of jobs being processed at the same time
  statsInterval: 3000 // When stat event is sent, in ms
});

q.on('done', function ( id, result ) {
  console.log(`Job done ${id}`); // `id` is an internal identifier generated by `qyu`
});

q.on('all-done', function() {
  console.log('All jobs are done');
});

q.on('error', function ( id, error ) {
  console.log(`Job ${id} threw an error: ${error.message}`);
});

(async () => {

  /* Testing wait method (ids 12 to 20) */
  const id0 = q.push(job);
  const id1 = q.push(longJob);
  await q.start();
  const res0 = await q.wait(id0);
  const res1 = await q.wait(id1);
  var error = false;
  if ("world!" != res0.Hello) {
    console.log(`Error: expecting 'world!' but got '${res0.Hello}'`);
    var error = true;
  }
  if ("It was a looong job" != res1.Hello) {
    console.log(`Error: expecting 'It was a looong job' but got ${res1.Hello}`);
    var error = true;
  }
  if (!error) {
    console.log('Everything went fine');
  }
  await q.pause();
})();

// example job:

async function job() {
  await wait(30);
  return {Hello: 'world!'} // That's the job `result`
}

async function longJob() {
  await wait(5000);
  return {Hello: 'It was a looong job'} // That's the job `result`
}

function wait(ms) {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms)
  });
}
