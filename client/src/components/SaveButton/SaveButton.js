import "./SaveButton.css";

export default function SaveButton({ onClick, theme }) {

  const isDesktop = window.matchMedia("(min-width: 768px)").matches;
  
  return (
    <div className="save-button">
     {isDesktop && (<button className={"save-button--"+theme} onClick={onClick}>Save Image</button>)}
    {!isDesktop && (<p className="screenshot-instruction">Screenshot to Save!</p>)}
    </div>
  );
}
