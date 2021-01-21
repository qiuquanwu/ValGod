var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.eat = function () {
        if (this.name) {
            console.log(this.name + "正在吃烧烤");
        }
    };
    return Animal;
}());
export { Animal };