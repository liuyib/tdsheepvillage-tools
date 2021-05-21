import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
      （404）你访问的页面走丢了。<Link to="/">返回首页</Link>
    </div>
  )
}

export default NotFound
