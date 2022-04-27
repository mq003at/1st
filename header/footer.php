<meta charset="utf-8">
<style>
    span#footer {
        display: block;
        text-align: right;
        padding: 15px;
    }
</style>

<script src="/js/jquery-3.2.1.js"></script>

<script>
    $(window).on("load", () => {
        let $footer = $("<span id=\"footer\"></span>");
        let $imgLogo = $("<img>", {
            id: "logo-img",
            src: "/img/logo_1.png"
        })
        $footer.append($imgLogo);
        $(document.body).append($footer);
    })
</script>