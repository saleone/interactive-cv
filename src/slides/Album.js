import PolaroidPhoto from '../components/PolaroidPhoto';

export default function AlbumSlide() {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-8 p-8">
        <PolaroidPhoto 
          imageUrl="https://picsum.photos/seed/nature/300/300"
          caption="Summer vacation 2023" 
        />
        <PolaroidPhoto 
          imageUrl="https://picsum.photos/seed/beach/300/300"
          caption="Beach memories" 
          width={220}
        />
        <PolaroidPhoto 
          imageUrl="https://picsum.photos/seed/mountain/300/300"
          caption="Mountain trip" 
          width={176}
        />
      </div>
    </div>
  )
}
