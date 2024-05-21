export function EditButton({show, setIsActive}) {
    if (!show) {
        return null;
    }
    return (
        <>
            <button
                className="edit-button"
                onClick={() => {
                    setIsActive(true);
                }}
            >
                Редактировать фото
            </button>
        </>
    )
}