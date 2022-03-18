import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const Login = () => import('../components/login/Login')
const Mydescript = () => import('../components/login/Mydescript')
const Happy = () => import('../components/login/Happy')
const Myinfo = () => import('../components/login/Myinfo')
const Markdown = () => import('../components/login/Markdown')
const CountCharge = () => import('../components/detail/CountCharge')
const MessageCenter = () => import('../components/detail/MessageCenter')
const MyCollect = () => import('../components/detail/MyCollect')
const Blogdetail = () => import('../components/login/Blogdetail')
const Author = () => import('../components/login/Author')
const ManageBlog = () => import("../components/detail/ManageBlog")
const BlogSafe = () => import('../components/detail/BlogSafe')

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    redirect: '/mydescript',
    children: [{
        path: '/mydescript',
        component: Mydescript
      },
      {
        path: '/happy',
        component: Happy
      },
      {
        path: '/author',
        component: Author
      },
      {
        name: 'Blogdetail',
        path: '/blogdetail',
        component: Blogdetail
      },
      {
        path: '/myinfo',
        component: Myinfo,
        redirect: '/countcharge',
        children: [{
            path: '/countcharge',
            component: CountCharge
          },
          {
            path: '/messagecenter',
            component: MessageCenter
          },
          {
            path: '/mycollect',
            component: MyCollect
          },
          {
            path: '/manageblog',
            component: ManageBlog
          },
          {
            path: '/blogsafe',
            component: BlogSafe
          }
        ]
      }
    ]
  },
  {
    name:'Markdown',
    path: '/markdown',
    component: Markdown
  }
]


const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to, from, next) => {
  const tokenStr = sessionStorage.getItem('token'); //获取token值
  if(to.path == '/Author'){
    next()
  }
  else if(to.path == '/Happy'){
    next()
  }else if(to.path !== '/mydescript' && !tokenStr) {
     next('/mydescript')
  }else{
    next()
  }
  
  
})

export default router