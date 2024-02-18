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
const imageRendererLoader = () => {
  const loaderImage = [
    `https://wethinkelastic.com/assets/images/152c223f4359675788470.svg`,
    `https://wethinkelastic.com/assets/images/24a07612b16472c6a503f.svg`,
    `https://wethinkelastic.com/assets/images/338b04b3ad8edf6773599.svg`,
    `https://wethinkelastic.com/assets/images/4e7e9b9fc472434d65a23.svg`,
    `https://wethinkelastic.com/assets/images/556ce542d7fdbd78d032e.svg`,
    `https://wethinkelastic.com/assets/images/6a714ad31db5d83bc967b.svg`,
    `https://wethinkelastic.com/assets/images/7c9e22462b51ae93b5a17.svg`,
    `https://wethinkelastic.com/assets/images/8a2db0cd90582eb4b877d.svg`,
    `https://wethinkelastic.com/assets/images/9e5b57420355774e0a99d.svg`,
    `https://wethinkelastic.com/assets/images/109804494fa1878703f2c1.svg`,
    `https://wethinkelastic.com/assets/images/11d1acd8abd7b1efc4c23d.svg`,
  ];
  const img = document.querySelector(`.img-box img`);
  let crval = 0;
  let itretion = 0;
  let maxIntrection = 3;

  // this function are insert the image into the src attribute
  const preLoad = () => {
    img.src = loaderImage[crval];
    crval = (crval + 1) % loaderImage.length;
  };
  const showImg = () => {
    preLoad();

    if (crval === 0) {
      itretion++;
      if (itretion >= maxIntrection) {
        clearInterval(myShowInt);
      }
    }
  };
  const time = Math.floor(Math.random() * 150) + 50;
  const myShowInt = setInterval(showImg, time);
  gsap.to("#loader", {
    top: "-100%",
    delay: 4,
    ease: "expo.out",
    duration:2.5,
    display: "none",
  });
};
imageRendererLoader();

const heroHed = document.querySelector(".hero>h1");
let culture = "";
heroHed.textContent.split("").forEach((words) => {
  culture += `<span>${words}</span>`;
});
heroHed.innerHTML = culture;

gsap.to(".hero h1 span", {
  y: "0%",
  stagger: 0.1,
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
  transform: `translateX(-60%)`,
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
  document.querySelector(`#container-four`).onmousemove = (e) => {
    gsap.to(`#container-four .mousefollow`, {
      x: e.clientX,
      y: e.clientY,
    });
  };
};
mouseFollower();

const fourContent = () => {
  let clutter = "";
  const box = [
    {
      vid: "https://wethinkelastic.com/assets/videos/thumnail-IEC.mp4",
      dec: "HEC PARIS IEC IEC",
      bra: "Branding, Digital,",
      digi: "Strategy",
    },
    {
      img: "https://wethinkelastic.com/assets/images/thumnail-lct-bb63b294bda19ec7d2ac40c5b93241a4.webp",
      dec: "THE TOGGLE COCK",
      bra: "Branding",
      digi: "Strategy",
    },
    {
      img: "https://wethinkelastic.com/assets/images/thumnail-trones-2f4eaf3828293da65eb7776898cbbaaf.webp",
      dec: "TRONE PARIS",
      bra: "Digital",
      digi: "Strategy",
    },
    {
      img: "https://wethinkelastic.com/assets/images/thumnail-delsey-f4bbad64ccead91e07e8f5e7de5a5370.webp",
      dec: "DELSEY",
      bra: "Branding",
      digi: "",
    },
    {
      vid: "https://wethinkelastic.com/assets/videos/thumnail-beev.mp4",
      dec: "BEEV",
      bra: "Branding,",
      digi: "Digital, Strategy",
    },
  ];
  box.forEach((obj) => {
    const divs = document.createElement("div");
    divs.append("#container-four");
    const innerDivs = document.createElement("div");
    innerDivs.append(divs);
    console.log(innerDivs);
  });
};
// fourContent();
