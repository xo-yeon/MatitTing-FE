import { BottomIconProps } from "types/layout";

const ChatIcon = ({ selected = false }: BottomIconProps) =>
  selected ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M320-524.616q14.692 0 25.038-10.346T355.384-560q0-14.692-10.346-25.038T320-595.384q-14.692 0-25.038 10.346T284.616-560q0 14.692 10.346 25.038T320-524.616Zm160 0q14.692 0 25.038-10.346T515.384-560q0-14.692-10.346-25.038T480-595.384q-14.692 0-25.038 10.346T444.616-560q0 14.692 10.346 25.038T480-524.616Zm160 0q14.692 0 25.038-10.346T675.384-560q0-14.692-10.346-25.038T640-595.384q-14.692 0-25.038 10.346T604.616-560q0 14.692 10.346 25.038T640-524.616ZM100.001-118.464v-669.227q0-30.308 21-51.308t51.308-21h615.382q30.308 0 51.308 21t21 51.308v455.382q0 30.308-21 51.308t-51.308 21H241.539L100.001-118.464Z" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="M320-524.616q14.692 0 25.038-10.346T355.384-560q0-14.692-10.346-25.038T320-595.384q-14.692 0-25.038 10.346T284.616-560q0 14.692 10.346 25.038T320-524.616Zm160 0q14.692 0 25.038-10.346T515.384-560q0-14.692-10.346-25.038T480-595.384q-14.692 0-25.038 10.346T444.616-560q0 14.692 10.346 25.038T480-524.616Zm160 0q14.692 0 25.038-10.346T675.384-560q0-14.692-10.346-25.038T640-595.384q-14.692 0-25.038 10.346T604.616-560q0 14.692 10.346 25.038T640-524.616ZM100.001-118.464v-669.227q0-30.308 21-51.308t51.308-21h615.382q30.308 0 51.308 21t21 51.308v455.382q0 30.308-21 51.308t-51.308 21H241.539L100.001-118.464Zm116-201.536h571.69q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-455.382q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H172.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v523.076L216.001-320ZM160-320v-480V-320Z" />
    </svg>
  );

export default ChatIcon;