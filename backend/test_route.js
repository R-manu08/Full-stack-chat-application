const testRoute = async () => {
    try {
        const response = await fetch("http://localhost:5001/api/messages/send/000000000000000000000001", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: "Hello test" })
        });
        const data = await response.json();
        console.log("Response:", response.status, data);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

testRoute();
