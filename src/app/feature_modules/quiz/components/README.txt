How it gonna work ? UI NOTE
[State-Less 👏]
[State-Full 💫]

0. Core 🔥 :
    UI Wating for load in backend
    State :
            UI
                1. Remember where [2. Expansion pannel] which help indicator
                2. [ ON | OFF ] Help
    Store :
            1. Current Help index ( could be choosen )
            2. Forward Help index
            3. [ ON | OFF ] Help

    Rxjs : [
        Considerate To Use 🤕
        BehaviorSubject:[
            currentSelectedIndex ( default Load at 1 
                if hit forward then index will update
            ),
            moving forward ( maybe not )
        ]
    ]
    


1. Main Warrper : [State-Full 💫]
    1.1 Left ( 75% size )
        1.1.1 question - Picutre [ PNG | GIF ( play button ? )] Center
            What if it to long ? Hmmm 😂
            . . . like pages Implemation ? ( HARD )
            Scroll :)) ( GOOOD )


    1.2 Right ( 25 % size )
        Data : [
        ]
        1.2.1 Auestion Title
        1.2.2 Auestion content [ Mul | Input]
        1.2.3 Check Answer [ Mul | Input]
        1.2.4 Show Help Button
            dataLink:[]
    1.3 Question Title ( Picutre , Title )

    Warp : ["Expansion pannel"]

2. Expansion pannel (Help) : [State-Full 💫]
    ui-deps:["auto-scroll-till-content",]
    deps-onAction:["1.2.4",]
    Data : (...)
    Feature :[
        "Forward for more help",
        "Rember current Help index" (Snap re-show on current possion), 
    ]
