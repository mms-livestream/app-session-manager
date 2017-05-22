
import React, { Component } from 'react';

class AboutContent extends Component {
  render() {
    return (
      <div className="container">
      <section id="contexte"  className="bg-dark">
          <div className="container">
              <div className="row">
                  <div className="col-lg-12 text-center">
                      <h2 className="section-heading">Contexte</h2>
                      <hr className="primary"/>
          <p> Nous constatons aujourd hui une forte augmentation des demandes de ressources
          vidéo live de bonne qualité et surtout sans interruptions. Afin de répondre à cette demande,
          nous créons une nouvelle solution se basant sur un protocole existant: MS-Stream.
          Nous adaptons alors ce protocole à un système donnant accès à des vidéos en live. Ce
          système optimise les ressources afin d obtenir une qualité optimale sans interruption qui
          s adapte en toutes circonstances. L idée est donc de parvenir à réagir suffisament rapidement
          pour que, lorsqu une vidéo devient rapidement très populaire, il n y ait pas de congestion dans
          le système et ainsi que tout le monde puisse obtenir la vidéo souhaité de bonne qualité et en
          direct. </p>
                </div>
            </div>
        </div>
    </section>

    <aside id="outils" className="bg-primary">
      <div className="container text-center">
          <div className="call-to-action">
              <h2>Outils</h2>
          </div>
          <h2>Dash</h2>
                <div className="panel-body"><p>La technologie Dash est utilisée dans le protocole ms-stream.
                  Elle permet de créer plusieurs versions d une même vidéo pour avoirs accès à différentes qualités.
                  Ainsi la version de vidéo reçue par le client s adapte selon le débit que sa connexion peut supporter
                  sans avoir d interruptions lors de la lecture du flux.</p>
                </div>
          <center>
          <img src="images/dash.png" className="img-thumbnail"/>
          </center>
          <h2>Ms stream</h2>
                <div className="panel-body"><p>La technoligue ms-stream ajout l utilisation de plusieurs serveurs pour atteindre
                les ressources. Les vidéos sont donc distribuées sur les différents serveurs selon un algorithme intelligent qui se base par exemple sur la
                popularité des vidéos. Lors de la distribution d une vidéo très populaire, ce sont les serveurs qui subissent la congestion et qui sont ainsi
                le premier frein à la distribution. Le protocole ms-stream permet de gérer cet effet.  </p></div>
           <center>
           <img src="images/ms-stream.jpg" className="img-thumbnail "/>
           </center>
      </div>
    </aside>
    <section id="notreSolution">
           <div className="container">
               <div className="row">
                 <h1 className="text-center">Notre solution</h1>
                 <div className="panel panel-default">
                       <div className="panel-body"><p> Nous utilisons tout d abord une application qui récupère le flux vidéo en live. Ensuite nous générons les versions
                         dans différentes qualités que nous envoyons au réplicateur. Le réplicateur permet la distribution de la ressource
                         sur les différents serveurs. C est ensuite ms-stream, que nous avons adapté pour un flux live, qui enverra les segments de vidéo chez la personne
                         souhaitant visionner la vidéo.
                         Derrière tout cela se cache une intelligence qui permet, entre autre, d indiquer combien de fois nous allons dupliquer la vidéo sur les serveurs.
                       </p>
                       </div></div>
                       <h3>Fonctionnement :</h3>
                     <img src="images/schemaDev.png" className="img-thumbnail"/>

               </div>
           </div>
       </section>
    <aside id="team" className="bg-primary">
       <div className="container text-center">
           <div className="call-to-action">
               <h2>Notre équie</h2>
           </div>
           <div className="col-sm-5 col-sm-offset-4" >
           <img src="/images/louis.jpg" className="img-thumbnail" />
           <div className = "caption">
               <div footer className="panel-body"><center><strong>Chef de Projet</strong></center></div>
           </div></div>

           <div className="col-sm-5  col-sm-offset-1" >
           <img src="/images/maxime.jpg" className="img-thumbnail"/>
             <div className="caption">
                   <div className="panel-body"><center><strong>Chef Technique</strong></center></div>
             </div></div>
               <div className="col-sm-5" >
             <img src="/images/saad.jpg" className="img-thumbnail"/>
               <div className="caption">
                 <div className="panel-body"><center><strong>Upload et Transcodage</strong></center></div>
               </div></div>
               <div className="col-sm-5 col-sm-offset-1" >
           <img src="/images/julien.jpg" className="img-thumbnail"/>
             <div className="caption">
                 <div className="panel-body"><center><strong >Réplication</strong></center></div>
             </div>
           </div>
             <div className="col-sm-5" >
             <img src="/images/guillaume.jpg" className="img-thumbnail"/>
               <div className="caption">
                     <div className="panel-body"><center><strong>Distribution MS-Stream</strong></center></div>
               </div></div>
               <div className="col-sm-5 col-sm-offset-1" >
           <img src="/images/mohamed.jpg" className="img-thumbnail"/>
             <div className="caption">
                   <div className="panel-body"><center><strong>Metadata Manager</strong></center></div>
             </div></div>
             <div className="col-sm-5" >
           <img src="/images/noellie.jpg" className="img-thumbnail"/>
             <div className="caption">
                   <div className="panel-body"><center><strong>Interface web</strong></center></div>
             </div></div>

       </div>
   </aside>




</div>

    );
  }
}

export default AboutContent
