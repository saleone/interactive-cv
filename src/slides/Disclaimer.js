export default function DisclaimerSlide() {
  let children = ["Disclaimer", "Disclaimer", "remialcsiD"]

  return (
    <>
      {children.map((text, i ) => {
        let effect = i  % 2 === 0 ? "transform -scale-y-50" : ""
        return (
          <h1 key={i} className={"text-6xl m-12 " + effect}>{text}</h1>
        )
      })}
    </>
  )
}
