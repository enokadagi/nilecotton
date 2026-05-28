// Simple SendGrid key verifier
const key = process.argv[2] || '';
(async () => {
  try {
    const res = await fetch('https://api.sendgrid.com/v3/user/account', {
      headers: { Authorization: 'Bearer ' + key },
    });
    console.log('STATUS:' + res.status);
    const body = await res.text();
    console.log(body);
  } catch (e) {
    console.error('ERROR:' + (e && e.message ? e.message : String(e)));
    process.exit(1);
  }
})();
