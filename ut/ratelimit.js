console.log('Testing with a rate limit of 10');
const qyu = require('../qyu');

const q = qyu({
  rateLimit: 10, // maximum number of jobs being processed at the same time
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

q.on('drain', function () {
  console.log('No more jobs to do');
});

q.on('stats', function ( nbJobsPerSecond ) {
  console.log(`${nbJobsPerSecond} jobs/s processed`)
});

q.on('rateLimit-reached', function() {
    console.log('Rate limit reached');
});

(async () => {
  var id = null;
  for (var i = 0; i < 20; ++i) {
    if (i < 10) {
      q.push(longJob, 5);
    } else {
      id = q.push(shortJob);
    }
  }
  await q.start();
  await wait(id);
})();

async function longJob() {
  await wait(3000);
  return {Hello: 'Milliseconds matter'} // That's the job `result`
}
async function shortJob() {
  await wait(300);
  return {Foo: 'bar'} // That's the job `result`
}


function wait(ms) {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms)
  });
}