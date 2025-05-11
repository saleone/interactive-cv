export default function DisclaimerSlide() {
  let children = ["Disclaimer", "Disclaimer", "Disclaimer"]

  return (
    <section>
      {children.map((text, i ) => {
        let rotate_180 = i  % 2 === 0 ? "transform -scale-y-50" : ""
        return (
          <h1 key={i} className={"text-6xl " + rotate_180}>{text}</h1>
        )
      })}
    </section>
  )
}
