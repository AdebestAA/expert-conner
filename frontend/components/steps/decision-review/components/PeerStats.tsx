import { Progress } from '@/components/ui/progress'

const PEER_STATS_DATA = [
  {
    progress: 93,
    text: 'ORDERED A TEST',
  },
  {
    progress: 93,
    text: 'MADE A DIAGNOSIS',
  },
  {
    progress: 88,
    text: 'PRESCRIBED A THERAPY',
  },
  {
    progress: 84,
    text: 'ISSUED AN ORDER',
  },
]

type PeerStatsData = {
  progress: number
  text: string
}

export const PeerStats = () => {
  return (
    <div>
      <h1 className="text-xl text-center mb-4">Peer Stats</h1>
      {PEER_STATS_DATA.map((peer) => (
        <div key={peer.text}>
          <div className="flex items-center gap-8 py-2">
            <Progress value={peer.progress} className="h-4 w-2/4" />
            <p className="text-right">{peer.progress}%</p>
            <p>{peer.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
