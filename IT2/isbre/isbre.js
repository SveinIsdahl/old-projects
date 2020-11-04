//@ts-check 

window.onload = () => {
    const divBre = document.getElementById("isbre")
    const divBakke = document.getElementById("bakke")
    const divHimmel = document.getElementById("himmel")
    const divPlanter = document.getElementById("planter")
    const button = document.getElementById("redo")

    let isbreKeyframes = [
        { transform: `translateX(0)` },
        { transform: `translateX(-800px)`, offset: 0.99, opacity: 1 },
        { transform: `translateX(-800px)`, offset: 1, opacity: 0 },
    ]
    let isbreTiming = {
        duration: 3000,
        iterations: 1,
        fill: "forwards",
    }
    let breAnimation = divBre.animate(
        isbreKeyframes,
        //@ts-ignore
        isbreTiming
    )
    breAnimation.pause()
    button.addEventListener("click", () => breAnimation.play())

}