const loco = () => {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
};
loco();

const heroHed = document.querySelector(".hero>h1");
let culture = "";
heroHed.textContent.split("").forEach((words) => {
  culture += `<span>${words}</span>`;
});
heroHed.innerHTML = culture;

gsap.to(".hero h1 span", {
  y: "0%",
});

gsap.to(".video-box", {
  width: "100%",
  scrollTrigger: {
    trigger: "#conatainer-second",
    scroller: "#main",
    start: "0% 100%",
    end: "0% 0%",
    scrub: 1,
  },
});
gsap.to("#container-five h1", {
  transform: `translateX(-40%)`,
  scrollTrigger: {
    scroller: "#main",
    trigger: "#container-five",
    start: "0% 0%",
    end: "0% -50%",
    scrub: 1,
    pin: true,
  },
});
gsap.to("#container-third h1", {
  y: "0%",
  scrollTrigger: {
    scroller: "#main",
    trigger: "#container-third",
    start: "0% 50%",
    end: "0% 0%",
  },
});
const mouseFollower = () => {
  // const cursor = document.querySelector() 
  document.querySelector(`#container-four`).onmousemove = e => {
    gsap.to(`#container-four .mousefollow`,{
      x: e.clientX,
      y: e.clientY,
    })
    console.log(e.clientX);
  }
}
mouseFollower();