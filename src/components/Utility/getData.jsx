import { collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase';

export const ProjectData = async () => {
    //Get projects data
    const projects = [];
    await getDocs(collection(db, "projects"))
        .then((querySnapshot) => {
            querySnapshot.forEach(project => {
                projects.push({
                    id: project.id,
                    ...project.data()
                })
            });
        });
    return projects;
};

export const AboutData = async () => {
    //Get about data
    const about = [];
    await getDocs(collection(db, "about"))
        .then((querySnapshot) => {
            querySnapshot.forEach(text => {
                about.push({
                    id: text.id,
                    ...text.data()
                })
            });
        });
    return about;
};