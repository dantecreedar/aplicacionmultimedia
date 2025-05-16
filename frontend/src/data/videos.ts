export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: string;
  username: string;
  url: string;
  description: string;
  likes: number;
  comments: number;
}

export const videos: Video[] = [
  {
    id: "1",
    title: "Big Buck Bunny",
    thumbnail: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=60",
    duration: "3:45",
    views: "1.2M",
    username: "usuario1",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description: "Big Buck Bunny cuenta la historia de un gigante conejo que se enfrenta a tres matones: un zorro, un mapache y un pájaro.",
    likes: 1200,
    comments: 45
  },
  {
    id: "2",
    title: "Elephants Dream",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=500&auto=format&fit=crop&q=60",
    duration: "4:20",
    views: "856K",
    username: "usuario2",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description: "Elephants Dream es el primer cortometraje de código abierto, creado por el Proyecto Orange.",
    likes: 856,
    comments: 32
  },
  {
    id: "3",
    title: "For Bigger Blazes",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&auto=format&fit=crop&q=60",
    duration: "5:15",
    views: "2.1M",
    username: "usuario3",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "Un video de demostración de alta calidad para probar la reproducción de video.",
    likes: 2100,
    comments: 78
  },
  {
    id: "4",
    title: "For Bigger Escapes",
    thumbnail: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=60",
    duration: "2:50",
    views: "450K",
    username: "usuario4",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "Otro video de demostración para probar la reproducción de video en diferentes dispositivos.",
    likes: 450,
    comments: 23
  },
]; 