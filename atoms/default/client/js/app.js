// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"
import { render, h } from "preact";
import SocialBar from 'shared/js/SocialShare';
import {$, $$} from 'shared/js/util';
import RelatedContent from "shared/js/RelatedContent";
import {gsap, Sine} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import Brother from "./Brother";
import store, { ACTION_SET_SECTIONS, fetchData } from "./store";
import {SwitchTransition, Transition, TransitionGroup} from "react-transition-group";
import { Logo, ScrollDown} from "./Icons";
import {Provider, useSelector, useDispatch} from "react-redux";
import { useEffect, useRef, useState } from "preact/hooks";
import {SmoothProvider} from "react-smooth-scrolling";

const assetsPath = "<%= path %>";

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({
    duration:1,
    ease: 'sine.inOut'
});

const setHtml = (html) => ({dangerouslySetInnerHTML:{__html: html}});

const Container = ({children, className}) => {
    return (
        // <div className="md:container  md:mx-auto">
        <div className={`GlabsContainer ${className}`}>
            <div className="container">
                {children}
            </div>
        </div>
    )
}
// const FlexContainer = (props) => {
const FlexContainer = ({children, className}) => {
    return (
        <div className={`flex-container ${className}`} >
            {children}
        </div>
    )
}


const Loading = () => 
    <FlexContainer className="loading">
        <div style={{width: 300}}>
            <img src={`${assetsPath}/glab_logo.svg`} />
        </div>
    </FlexContainer>

const HeaderWithLogo = () => {
    const content = useSelector(s=>s.content);

    return (
        <header>
            <div className="">

                <div className="bg"
                    style={`background-image: linear-gradient(360deg, rgba(0,0,0,0.7) 10%, transparent 40%), url('${assetsPath}/header.jpg');`}>
                    
                    <div className="client">
                        <p>Paid for by 
                            <a href={content.logoLink} target="_blank">
                                <Logo />
                            </a>
                        </p>
                    </div>
                        <div>
                    <div class="title">
                            <h1 className="text-bg"><span data-dyn="headline">{content.headline}</span></h1>
                            <div className="subhead" {...setHtml(content.subhead)}></div>
                            <ScrollDown />
                        </div>
                    </div>
                </div>
            </div>
        </header>        
    )
}

const Header = () => {
    const content = useSelector(s=>s.content);

    return (
        <div className="header" >
            <div className="bg" style={{
            backgroundImage: `linear-gradient(0, rgba(0, 0, 0, 1) 0, rgba(0, 0, 0, 0) 50%), url(${assetsPath}/header.jpg)`
        }}>
                        <div>
                    <div class="title">
                            <h1 className="text-bg" {...setHtml(content.headline)}></h1>
                            <div className="subhead" {...setHtml(content.subhead)}></div>
                            <ScrollDown />
                        </div>
                    </div>
            {/* <Container className="title-block">
                <div className="client-tab">
                    <h1 {...setHtml(content.title)}></h1>
                </div>
                <div>
                    <div className="main-title" {...setHtml(content.headline)}>
                        <h1 {...setHtml(content.headline)}></h1>
                    </div>

                </div>

            </Container> */}

            </div>
        </div>        
    )
}

const Attribution = ({content}) => {
    return (
        <div className="attribution">
            <p>Paid for by 
                <a className="mt-4 block" href={content.logoLink} target="_blank">
                    <img src={`${assetsPath}/logo.png`} className="logo" />
                </a>
            </p>
            <div className="about-content" {...setHtml(content.aboutLink)} />
        </div>
    )
}

const Footer = ({content, related, shareUrl}) => {

    return (
        <section className="footer">
            <div className="content">
                <div className="break"><span /><span /><span /><span /></div>

                <div className="cta-wrap">
                    <div className="cta" {...setHtml(content.cta)} />
                    <div className="disc" {...setHtml(content.disc)}></div>

                </div>
                

                <div className="share">
                    <SocialBar title={content.shareTitle} url={shareUrl} />
                </div>
                <div className="related">
                    <RelatedContent cards={related} />
                </div>
            </div>
        </section>
    )
}

const StandfirstWithBorder = ({content}) => {

    return (
        <section className="standfirst">
            <div className="content" >
                <div className="lines">

                <div className="body" {...setHtml(content.standfirst)}>

                </div>
                </div>
                <ScrollDown />
            </div>
        </section>
    )
}

const Standfirst = ({content}) => {

    return (
        <div className="standfirst">
                <div className="content" {...setHtml(content.standfirst)}></div>
        </div>
    )
}

const Intro = ({content}) => {

    return (
        <div className="intro">
                <div className="content" {...setHtml(content.intro)}></div>
        </div>
    )
}


const SmoothScroll = ({children}) => {
    const app = useRef();
    const [pos, setPos] = useState(window.scrollY);
    useEffect(()=>{
        window.addEventListener('scroll', (e) => {
            e.preventDefault();
            const dy = pos-window.scrollY;
            console.log(Math.max(-2100, dy));
            setPos(window.scrollY);
            gsap.to(app.current, {duration: 0.5, y: Math.max(-2100, dy), ease: 'sine.out'});
        });
    },[])
    return (
        <div ref={app}>
            {children}
        </div>
    )
}



const MainBody = ({children}) => {
    const mainRef = useRef();

    // useEffect(()=>{
    //     const resize = () => {
    //         // mainRef.current.style.height = mainRef.current.scrollHeight * 0.5 + 'px';
    //         mainRef.current.style.height = document.body.scrollHeight * 0.5 + 'px';
    //         // console.log(mainRef.current.scrollHeight, mainRef.current.scrollHeight * 0.5 + 'px');
    //         console.log('size')
    //     }
    //     window.addEventListener('resize', resize);

    //     resize();

    //     return () => window.removeEventListener('resize', resize);
    // },[]);

    return (
        <div className="main" ref={mainRef}>
            {children}
        </div>
    )
}

const Main = () => {
    const loaded = useSelector(s=>s.dataLoaded);
    
    const dispatch = useDispatch();



    useEffect(()=>{
        dispatch( fetchData('https://interactive.guim.co.uk/docsdata/1Jd0rVSO-di-yFRTzWWF1dy3qCHvxQNd4XSuTf69ASx4.json') );
    },[]);


    

    const content = useSelector(s=>s.content);

    const store = useSelector(s=>s);    
    // return <Loading />;

    return (
        <SwitchTransition>
            <Transition
                key={loaded}
                timeout={1000}
                onEnter={n=>gsap.from(n,{alpha: 0})}
                onExit={n=>gsap.to(n,{alpha:0})}
                mountOnEnter
                unmountOnExit
                appear={true}
            >
                {!loaded && <Loading />}
                {loaded &&

                    
                    <MainBody>

                        
                        <Header />
                        <section>
                            <Container>
                                <div className="intro-body">
                                    <div>
                                        <Attribution content={content}/>

                                    </div>
                                    <div>
                                        <Standfirst content={content}></Standfirst>
                                        <Intro content={content}></Intro>

                                    </div>
                                </div>
                            </Container>                        

                        </section>
                        <Brother />
                        <Footer content={content} related={store.sheets.related} shareUrl={store.sheets.global[0].shareUrl} />
                        
                        
                    </MainBody>
                    
                }
            </Transition>            
        </SwitchTransition>
    )
}


const App = () => {
    return (
        <Provider store={store}>
            <Main/>
        </Provider>

    )
}

render( <App/>, document.getElementById('Glabs'));

