import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10000 }, // Ramp up to 10 users over 30 seconds
    { duration: '20s', target: 10000 },  // Stay at 10 users for 1 minute
    { duration: '5s', target: 0 },  // Ramp down to 0 users over 30 seconds
  ],
};

export default function () {
  let res = http.get('https://test.techvaffel.online/'); // Replace with your Cloud Run URL
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}

