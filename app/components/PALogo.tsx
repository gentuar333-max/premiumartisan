// components/PALogo.tsx
export default function PALogo() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
        .pa-logo-5 { font-family: 'Bebas Neue', sans-serif; }
        .pa-logo-5 .pa-container { display: flex; align-items: center; gap: 15px; }
        .pa-logo-5 .pa-icon-box {
          background: #ff6b35;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #000;
          transform: rotate(45deg);
          flex-shrink: 0;
        }
        .pa-logo-5 .pa-icon-box span { transform: rotate(-45deg); display: block; }
        .pa-logo-5 .pa-text-box { text-align: left; }
        .pa-logo-5 .pa-main-text { font-size: 2.2rem; color: #fff; letter-spacing: 3px; line-height: 0.9; display: block; }
        .pa-logo-5 .pa-sub-text { font-size: 0.7rem; color: #ff6b35; letter-spacing: 4px; font-family: 'Montserrat', sans-serif; display: block; }
      `}</style>
      <div className="pa-logo-5">
        <div className="pa-container">
          <div className="pa-icon-box">
            <span>⚒</span>
          </div>
          <div className="pa-text-box">
            <span className="pa-main-text">PREMIUM</span>
            <span className="pa-main-text">ARTISAN</span>
            <span className="pa-sub-text">MARKETPLACE</span>
          </div>
        </div>
      </div>
    </>
  );
}