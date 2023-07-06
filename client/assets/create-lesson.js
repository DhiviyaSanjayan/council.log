document.getElementById("create-lesson-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const category = document.getElementById("category").value;
    const className = document.getElementById("class-name").value;
    const classTime = document.getElementById("class-time").value;
    const duration = document.getElementById("duration").value;
    const description = document.getElementById("description").value;
    const address = document.getElementById("address").value;
    let teacherId;

    try {

        teacherId = localStorage.getItem("userId");

        const classData = {
            category,
            class_name: className,
            class_time: classTime,
            address,
            duration,
            description,
            teacher_id: teacherId,
        };

        const classResponse = await fetch("http://localhost:5050/class", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(classData),
        });

        if (classResponse.ok) {
            const data = await classResponse.json();
            console.log(data);
            alert("Class created successfully!");

        } else {
            const errorResponse = await classResponse.json();
            console.error("Error:", errorResponse);
            alert("An error occurred while creating the class. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while creating the class. Please try again.");
    }
});
