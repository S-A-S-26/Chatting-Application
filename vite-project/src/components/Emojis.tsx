
export default function Emojis({ addEmojitoMsg }: { addEmojitoMsg: (val: string) => void }) {

    // const emojis = [😀,😃,😄]
    const emojis = ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😜", "😝", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭", "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔", "🤭", "🤫", "🤥", "😶", "😐", "😑", "😬", "🙄", "😯", "😦", "😧", "😮", "😲", "🥱", "😴", "🤤", "😪", "😵", "🤐", "🥴", "🤢", "🤮", "🤧", "😷", "🤒", "🤕"];

    return (
        <>

            <div className="flex flex-wrap p-3 justify-start">
                {
                    emojis.map((val, id) => (<>
                        <div key={id} className="grid place-items-center w-8 h-8">
                            <button className="text-xl bg-none p-0 m-0 bg-transparent border-none hover:text-3xl" onClick={() => addEmojitoMsg(val)}>
                                {val}
                            </button>
                        </div>
                    </>))
                }
            </div>
        </>
    )
}
