import React, { Component } from 'react'

class AboutPage extends Component {
  render () {
    return(
      <div className="about-container">
          <div className="about_content">
            <h1>Cześć użytkowniku! </h1>
            <p>
                Stojąc w kolejce w Macu myślisz o tym czy lepsza będzie pętla for czy while?
                Kawa w Starbucksie nie smakuje, jeśli nie zrobiłeś od rana żadnego reduce'a?
                Żując resztki wczorajszej pizzy myślisz, że 'aaa mogłem to zmapować!'?
            </p>
            <p>
                Takich jak Ty jest więcej! (Serio?)
                Dzięki Naszej aplikacji już nigdy nie będziesz sam.
                Spotykaj się z innymi, w dowolnym miejscu, o dowolnym
                czasie, by kodować w wybranej przez Ciebie technologii.
            </p>
            <h2>Zarejestruj się, aby móc:</h2>
              <li>tworzyć nowe wydarzenia,</li>
              <li>dołączyć i kodzić z innymi,</li>
              <li>dodawać wydarzenia do ulubionych, by móc mieć je zawsze pod ręką!</li>
            <p>
                Uzupełnij wszystkie szczegóły Twojego wydarzenia, dodaj krótki opis oraz
                dodaj wskaźnik na mapie, by móc spotykać się z innymi rządnymi kodu wariatami
                w Twojej ulubionej restauracji przy schabowym z duraleksu
            </p>
            <h2>Możesz nam również nawrzucać. W wersji Premium.</h2>
            <h1>Tej droższej!</h1>
            <h3>@Bartosz Zawada @Michał Muszyński @Bartosz Frąckiewicz</h3>
          </div>
      </div>
    )
  }
}

export default AboutPage