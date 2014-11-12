(function () {
    var fifteens = new Fifteens();
    document.body.appendChild(fifteens.elem);
    var button = document.getElementById('button');
    button.addEventListener('click', fifteens.chooseDrawer);
})();



