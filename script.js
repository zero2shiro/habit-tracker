const user = localStorage.getItem("currentUser");
if (!user) location.href = "login.html";

const idx = localStorage.getItem("selectedHabitIndex");
if (idx === null) location.href = "select.html";

let habits =
    JSON.parse(localStorage.getItem(`habits_${user}`)) || [];

const habit = habits[idx];
document.getElementById("trackerTitle").innerText = habit.name;

document.getElementById("logoutBtn").onclick = () => {
    localStorage.clear();
    location.href = "login.html";
};

const months = [
    ["January",31],["February",28],["March",31],["April",30],
    ["May",31],["June",30],["July",31],["August",31],
    ["September",30],["October",31],["November",30],["December",31]
];

const container = document.getElementById("trackerContainer");

function save() {
    localStorage.setItem(`habits_${user}`, JSON.stringify(habits));
}

months.forEach((m, mi) => {
    const div = document.createElement("div");
    div.innerHTML = `<h3>${m[0]}</h3>`;
    const days = document.createElement("div");
    days.className = "days";

    habit.data[mi].forEach((v, di) => {
        const d = document.createElement("div");
        d.className = "day";

        const label = document.createElement("label");
        label.innerHTML = `
            <input type="checkbox" ${v ? "checked" : ""}>
            <span>${di+1}</span>
        `;

        label.onclick = () => {
            habit.data[mi][di] = !habit.data[mi][di];
            save();
        };

        d.append(label);
        days.append(d);
    });

    div.append(days);
    container.append(div);
});
