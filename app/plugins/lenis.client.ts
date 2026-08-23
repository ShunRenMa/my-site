
import Lenis from 'lenis';
import 'lenis/dist/lenis.css'

export default defineNuxtPlugin((nuxtApp) => {

  if(isDesktopDevice()) {
    const lenis = new Lenis({
      autoRaf: true,
    });

    // lenis.on('scroll', (e) => {
    //   console.log(e);
    // });
  }
})


