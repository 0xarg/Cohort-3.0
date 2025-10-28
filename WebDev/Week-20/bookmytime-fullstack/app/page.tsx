
import { NavBar } from "./components/Navbar";



export default async function Home(){
  return (
    <div className="text-white   flex flex-col gap-20">
      <NavBar home={false} />
      <div className="  min-h-96 flex  justify-around items-center gap-50 ">
<div className="flex flex-col">
  <span className="text-3xl">
    EveryThing You Need To Book

  </span>
    <span className="text-sm text-neutral-600">
      Try Now
    </span>
</div>
<div className="max-w-150 text-neutral-700">
Basic Intro Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate officia recusandae veniam laboriosam! Dolorum, suscipit corrupti voluptatem iusto perferendis quis et provident nam quaerat sit ipsum voluptas minus, temporibus earum.
Odio rerum quo a quas. Obcaecati accusamus vitae consequuntur ex cum minus reprehenderit laboriosam molestiae, quos earum perspiciatis mollitia sint harum ullam tempora distinctio eligendi dignissimos quod beatae! Sunt, cupiditate?
Distinctio aspernatur voluptas ipsum recusandae sit vel placeat, nisi quam eligendi libero quia magni, delectus esse aliquid quis quisquam expedita atque excepturi magnam sapiente in dolorem, autem soluta. Non, fuga!
</div>
      </div>
    </div>
  );
}
