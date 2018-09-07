/*
 * Testing job priorities of qyu
 */
console.log('Testing priorities of pushed tasks');

const qyu = require('../qyu');

const q = qyu({
  rateLimit: 50, // maximum number of jobs being processed at the same time
  statsInterval: 300 // When stat event is sent, in ms
});

q.on('done', function ( id, result ) {
  idsReturns.push(id);
});

q.on('error', function ( id, error ) {
  console.log(`Job ${id} threw an error: ${error.message}`);
});

q.on('drain', function () {
});

const expectedJobsOrder = [5, 8, 3, 2, 10, 9, 11, 4, 1, 6, 7, 0];
const idsReturns = [];
q.on('all-done', () => {
  console.log('All jobs are done');
  var error = false;
  expectedJobsOrder.forEach((jobId, index) => {
    if (idsReturns[index] == undefined) {
      console.log('Error: missing job...');
      error = true;
    } else if (jobId != idsReturns[index]) {
      console.log(`Error: Expecting job identifier ${jobId} but got ${idsReturns[index]}`);
      error = true;
    }
  });
  if (!error) {
    console.log('Everything came back in expected order');
  }
});

q.on('stats', function ( nbJobsPerSecond ) {
  console.log(`${nbJobsPerSecond} jobs/s processed`);
});

(async () => {

  /* Testing priorities */
  [10, 7, 4, 3, 6, 1, 8, 9, 2, 5, 4, 5].forEach((priority) => {
    id = q.push(
      job, // function to execute
      priority   // optional priority, from 1 to 10, 1 being the highest priority - default: 5
    ); // returns the internal id
  });

  await q.start(); // returns a promise resolved when `q` has started (first time) or unpaused
})();

async function job() {
  await wait(30);
  return {Hello: 'world!'} // That's the job `result`
}

function wait(ms) {
  return new Promise((resolve) => {
    return setTimeout(resolve, ms)
  });
}
