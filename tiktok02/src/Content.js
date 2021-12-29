import { memo } from "react"

function Content({count}) {
  
  console.log("Re-render");

  return (
    <>
        <h1>HELLO ANH EM F8</h1>
    </>
  );
}

// export default Content;
export default memo(Content);
