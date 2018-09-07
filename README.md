# Crawler assignment: 🐍 `qy`

## What does qyu is doing

qyu is an in-memory queue handling priority or popping jobs FIFO for same priorities.

## Events

qyu is sending six different types of events:
* done: a job pushed in queue has been done
* all-done: all jobs are over
* error: a job pushed in queue has terminated with an error
* drain: the queue was emptied
* stats: send the number of job processed by second
* rateLimit-reached: the maximum number of jobs simultaneously running is reached

## Unit Test
Some basic unit tests are provided in ut directory

## Feedback
Any feedback and/or questions are welcomed
