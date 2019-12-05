function load (url, callback) {
    const script = document.createElement('script');
    script.src = url;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.onload = function () {
        callback();
    };
    document.body.appendChild(script);
}

export default load;
