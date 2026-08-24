<script setup lang="js">
  const itemClass = "nav_item";
  const itemTitleClass = "nav_item_title";
  const itemContentClass = "nav_item_content";
  const home = "/";
  const siteMap = {
    "ABOUT": "/about",
    "CONTACT": "/contact"
  };
  const workObj = {
    GITHUB: "https://github.com/ShunRenMa",
    LINKEDIN: "https://www.linkedin.com/in/shun-ren-ma-94b42815a/",
  }
  const socialObj = {
    INSTAGRAM: "https://www.instagram.com/paka.ph_024/"
  };
  const copyRight = "© 2026 Shun Ren Ma. All rights reserved.";
</script>
<template>
  <footer>
    <div class="footer_content">
      <div class="nav_area">
        <div :class="itemClass">
          <div :class="itemTitleClass">
            <p>WORK</p>
          </div>
          <div v-for="( link, item ) in workObj" :class="itemContentClass">
            <ul>
              <li>
                <a :href="link" target="_blank" rel="noopener">{{ item }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>


<style scoped>
  footer {
    background-color: transparent;
    text-align: left;
    position: relative;
    width: 100vw;
  }
</style>