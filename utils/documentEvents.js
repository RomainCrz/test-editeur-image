document.addEventListener('keydown', (event) => {
    if (event.key === "Backspace" || event.key === "Delete") {
        deleteObject()
    }
})