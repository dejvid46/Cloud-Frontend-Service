import FolderTable from './FolderTable';
// name date size
const rows = [
    {id: 0, name: "cat.jpg", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 1, name: "text.txt", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 2, name: "pipipupi.mp3", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 3, name: "pumprdlik.avi", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 4, name: "Kuku", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 5, name: "Kuku2", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 6, name: "Kuku2", modified: "11. 2. 2018", type: "folder", size: 0 },
    {id: 7, name: "Kuku2", modified: "11. 2. 2018", type: "folder", size: 0 },

];

export default () => {

    const tableHeight = window.screen.height * 0.74;

    const rowsCount = Math.round(tableHeight / 65);

    return (
        <>
            <div id="tableDiv" style={{ height: `${tableHeight}px`, width: '100%' }}>
                
                <FolderTable table={rows} rowsCount={rowsCount} />
            </div>
        </>
    );
}