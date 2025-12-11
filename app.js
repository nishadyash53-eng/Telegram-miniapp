// Basic interactivity + Telegram WebApp integration
const balanceText = document.getElementById('balanceText');
const tpValue = document.getElementById('tpValue');
const tpTimer = document.getElementById('tpTimer');
const qrModal = document.getElementById('qrModal');
const qrImage = document.getElementById('qrImage');
const qrAddr = document.getElementById('qrAddr');
const closeQr = document.getElementById('closeQr');

let balance = 0.00;
let tp = 1.00;
let dailyEarn = 0.06;
let countdownSeconds = 3600 + 2100; // sample

function render(){
  balanceText.textContent = `$${balance.toFixed(2)}`;
  tpValue.textContent = `$${tp.toFixed(2)}`;
  document.getElementById('dailyEarn').textContent = `$${dailyEarn.toFixed(2)}`;
}
render();

function startTimer(){
  setInterval(()=>{
    if(countdownSeconds>0) countdownSeconds--;
    const h = Math.floor(countdownSeconds/3600);
    const m = Math.floor((countdownSeconds%3600)/60);
    const s = countdownSeconds % 60;
    tpTimer.textContent = `Time left : ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m ${String(s).padStart(2,'0')}s`;
  },1000);
}
startTimer();

// QR modal demo (replace with real QR generated server-side)
document.getElementById('withdrawBtn').addEventListener('click', ()=> {
  // show deposit/withdraw QR for testing
  qrImage.src = 'placeholder-qr.png';
  qrAddr.textContent = 'Wallet: 0x...YOURADDRESS';
  qrModal.classList.remove('hidden');
});
closeQr.addEventListener('click', ()=> qrModal.classList.add('hidden'));

document.getElementById('buyTp').addEventListener('click', ()=> {
  alert('Buy TP pressed — you should call server to create payment and show QR / link.');
});

// Telegram WebApp handoff
function initTelegramWebApp(){
  try {
    if(window.Telegram && window.Telegram.WebApp){
      const tg = window.Telegram.WebApp;
      // example: get user info
      const user = tg.initDataUnsafe?.user || {};
      console.log('Opened from Telegram WebApp by', user);
      // you can call tg.ready(), tg.expand(), tg.MainButton.text = '...'
      tg.ready();
    }
  } catch(e){
    console.warn('Telegram WebApp not available', e);
  }
}
initTelegramWebApp();
