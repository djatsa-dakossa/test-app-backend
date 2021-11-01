# test-app-backend
Test application api documentation.


Pour commencer, si vous ne souhaitez pas utiliser docker, à la ligne 24,remplacer la valeur de <strong>localUrl</strong> par "mongodb://127.0.0.1:27017/database" cette valeur dépendra de votre configuration
vous devrez également installerles dépendances du projet
.

si vous souhaitez par contre utiliser docker, dans la racine du projet dans votre terminal, lancer la commande <strong>docker-compose up </strong>, cette commande lancera le projet, ainsique la bd.


L'API sera disponible sur le port 8081.

L'ensemble des services seront disponibles ici via des end-points:

<strong> users urls</strong>
Voicila liste des urls associés à l'utilisateur.


<strong> /auth/register :</strong>
  Vous utiliserez cette route en post pour créer un compte en passant dans le body les informations:
  {
    fullName: string,
    email: string,
    password: string
  }


<strong> /auth/sign_in :</strong>
  Vous utiliserez cette route en post pour vous connecter à votre compte en passant dans le body les informations:
  {
    email: string,
    password: string
  }
NB: Les mots de passe sont cryptés, et les tokens sont protégés
  
  
<strong> notebooks urls</strong>
Voicila liste des urls associés aux notebooks et aux notes.
NB: cette route est protégée

<strong> /new/notebook :</strong>
  Vous utiliserez cette route en post pour créer un cahier de notebook en passant dans le body les informations:
  {
    title: string,
    descrition: string,
  }
 
 
<strong> /notesbooks :</strong>
  Vous utiliserez cette route en get pour avoir la liste des cahiers de charges.
  
 
<strong> /notesbooks/:notebook_id :</strong>
  Vous utiliserez cette route en get pour avoir les informations d'un cahier de notes.
 
  
<strong> /notesbooks/:notebook_id :</strong>
  Vous utiliserez cette route en delete pour supprimer un cahier .
  
  
<strong> /notesbooks/:notebook_id :</strong>
  Vous utiliserez cette route en put pour modifier les informations d'un cahier.

  
<strong> /new/notebook/:notebook_id/note : </strong>
  Vous utiliserez cette route en post pour créer une note en passant dans le body les informations:
  {
    title: string,
    content: string,
  } 
 
 
<strong> /notebook/:notebook_id/notes : </strong>
  Vous utiliserez cette route en get pour avoir la liste des notes associées à un cahier de charge.
  
 
<strong> /notebook/:notebook_id/note/:note_id :</strong>
  Vous utiliserez cette route en get pour avoir les informations d'une note.
 
  
<strong> /notebook/:notebook_id/note/:note_id :</strong>
  Vous utiliserez cette route en delete pour supprimer une note .
  
  
<strong> /notebook/:notebook_id/note/:note_id :</strong>
  Vous utiliserez cette route en put pour modifier les informations d'une note.


Les messages d'erreur sont stockésdans la variable <strong>message de l'objet de réponse</strong>
