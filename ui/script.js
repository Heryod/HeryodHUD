document.addEventListener("DOMContentLoaded", function() {
    const hpIcon = document.getElementById("hud-icon1");
    const armourIcon = document.getElementById("hud-icon2");
    const staminaIcon = document.getElementById("hud-icon3");
    const hungerIcon = document.getElementById("hud-icon4");
    const thirstIcon = document.getElementById("hud-icon5");
    const container = document.getElementById("container");

    window.addEventListener("message", function(event) {
        let e = event.data;
        if (e.action == "update") {
            container.style.display = 'flex';
            
            let playerHP = (e.playerHP / 200) * 100; 
            let playerArmor = e.playerArmor;
            let playerStamina = e.playerStamina;
            let hungerPercent = e.hungerPercent;
            let thirstPercent = e.thirstPercent;

            hpIcon.style.backgroundImage = `linear-gradient(to top, rgb(145, 11, 11) ${playerHP}%, transparent 0%)`;
            armourIcon.style.backgroundImage = `linear-gradient(to top, rgb(61, 78, 179) ${playerArmor}%, transparent 0%)`;
            staminaIcon.style.backgroundImage = `linear-gradient(to top, rgb(0, 102, 22) ${playerStamina}%, transparent 0%)`;
            hungerIcon.style.backgroundImage = `linear-gradient(to top, rgb(173, 113, 22) ${hungerPercent}%, transparent 0%)`;
            thirstIcon.style.backgroundImage = `linear-gradient(to top, rgb(21, 155, 160) ${thirstPercent}%, transparent 0%)`;
        } 
        else if (e.action == "close") {
            container.classList.add("container-hidden");

            setTimeout(() => {
                container.style.display = 'none';
                container.classList.remove("container-hidden");
            }, 500); 
        }
    });
});
