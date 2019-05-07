define(["jquery"], $ => {
    function Footer () {
            this.footer = $("#footer");
            this.load();
    }
    //对象合并
    $.extend(Footer.prototype, {
        // 加载 footer.html 到页面中
        // 把footer.html  加载到 footer里
        load () {
           this.footer.load("/html/module/footer.html");
        }
    })
    return new Footer();
});