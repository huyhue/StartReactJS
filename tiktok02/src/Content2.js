import { memo } from "react"

function Content2({onIncrease}) {
  
  console.log("Re-render2");

  return (
    <>
        <h1>HELLO HI HOW ARE YOU</h1>
        <button onClick={onIncrease}>Content</button>
    </>
  );
}

// export default Content;
export default memo(Content2);
