(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{EDuE:function(e,a,t){},JBOV:function(e,a,t){"use strict";t.r(a),t.d(a,"listQuery",(function(){return o}));t("XfO3"),t("HEwt"),t("f3/d"),t("a1Th"),t("Btvt");var n=t("q1tI"),l=t.n(n),r=t("Wbzz"),c=(t("+eM2"),t("EDuE"),t("Bl7J")),s=t("vrFN"),m=t("FRpb"),i=t("o+pQ"),o="342639269";a.default=function(e){var a=e.data.allMarkdownRemark.edges,t=e.data.site.siteMetadata.labels,n=e.pageContext,o=n.currentPage,d=n.numPages,u=1===o,p=o===d,E=o-1==1?"/":(o-1).toString(),g=(o+1).toString();return l.a.createElement(c.a,null,l.a.createElement(s.a,{title:"Home",keywords:["gatsby","javascript","react","web development","blog","graphql"]}),l.a.createElement("div",{className:"index-main"},l.a.createElement("div",{className:"sidebar px-3"},l.a.createElement(m.a,null)),l.a.createElement("div",{className:"post-list-main px-4"},a.map((function(e){var a=e.node.frontmatter.tags;return l.a.createElement("div",{key:e.node.id,className:"container mt-5"},l.a.createElement(r.Link,{to:e.node.fields.slug,className:"text-dark"},l.a.createElement("h2",{className:"title"},e.node.frontmatter.title)),l.a.createElement("small",{className:"d-block text-info"},l.a.createElement("i",null,"Posted on ",e.node.frontmatter.date)),l.a.createElement("p",{className:"mt-3 d-inline"},e.node.excerpt),l.a.createElement(r.Link,{to:e.node.fields.slug,className:"text-primary"},l.a.createElement("small",{className:"d-inline-block ml-3"}," Read full post")),l.a.createElement("div",{className:"d-block"},function(e){var a=[];return e.forEach((function(e,n){t.forEach((function(t){e===t.tag&&a.push(l.a.createElement(i.a,{key:n,tag:t.tag,tech:t.tech,name:t.name,size:t.size,color:t.color}))}))})),a}(a)))})),l.a.createElement("div",{className:"text-center my-4"},l.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"center",alignItems:"center",listStyle:"none",padding:"0"}},!u&&l.a.createElement("li",{className:"pagenum"},l.a.createElement(r.Link,{to:E,rel:"prev",className:"pagenum-link"},"← Previous Page")),Array.from({length:d},(function(e,a){return l.a.createElement("li",{className:"pagenum"},l.a.createElement(r.Link,{key:"pagination-number"+(a+1),to:"/"+(0===a?"":a+1),className:"pagenum-link"},a+1))})),!p&&l.a.createElement("li",{className:"pagenum"},l.a.createElement(r.Link,{to:g,rel:"next",className:"pagenum-link"},"Next Page →")))))))}}}]);
//# sourceMappingURL=component---src-templates-post-list-js-53d3162394cf20068909.js.map