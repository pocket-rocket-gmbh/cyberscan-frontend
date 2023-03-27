export default {
    rootPath() {
        if (document.location.hostname.indexOf("localhost") >= 0
            || document.location.hostname.indexOf("127.0.0.1") >= 0) {
            return "http://localhost:8000/"
        }
        return "/";
    }
}