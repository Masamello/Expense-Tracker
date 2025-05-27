function updateProgressBar(Expense, Badget) {
    let percentage = (Expense / Badget) * 100;
    document.querySelector(".progressBar").style.width = percentage + "%";
}
updateProgressBar(800, 1000);
