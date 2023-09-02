import React, { useState,useRef, useEffect } from 'react';
import * as d3 from 'd3';

const DataTable = ({ data }) => {
    return (
      <div className="grid grid-cols-3 gap-4 h-[90vh] w-4/6 mt-10 bg-[#ffffffFF] border-[#ffffffee] rounded-lg place-items-center">
        <div className="font-bold border-b border-black">Sender Address</div>
        <div className="font-bold border-b border-black">Receiver Address</div>
        <div className="font-bold border-b border-black">Transaction</div>
        {data.map((transaction, index) => (
          <>
            <div key={index + "-sender"} className="border-black overflow-hidden whitespace-nowrap text-overflow[ellipsis] max-w-[100px]">
              {transaction.sender_address}
            </div>
            <div key={index + "-receiver"} className="overflow-hidden whitespace-nowrap text-overflow[ellipsis] max-w-[100px]">
              {transaction.receiver_address}
            </div>
            <div key={index + "-action"} className="overflow-hidden whitespace-nowrap text-overflow[ellipsis] max-w-[100px]">
              {transaction.amount}
            </div>
          </>
        ))}
      </div>
    );
};


  
const Graph = ({walletId }) => {
    const graphRef = useRef(null);
    let previousWalletId = useRef(null);
    
  // Hardcoded array of transactions
  const data = [
    { sender_address: '0x123', receiver_address: '0x456',amount: "6 Eth" },
    { sender_address: '0x789', receiver_address: '0xabc',amount: "4.2 Eth" },
    { sender_address: '0x789', receiver_address: '0xa9c',amount: "4 Eth" },
    { sender_address: '0x859', receiver_address: '0xa50c',amount: "0.2 Eth" },
    { sender_address: '0x8591', receiver_address: '0xa503c', amount: "0.7Eth" },
    { sender_address: '0x8290', receiver_address: '0xa503c', amount: "0.4 Eth" },
    { sender_address: '0x123', receiver_address: '0x456', amount: "0.2 Eth" },
    { sender_address: '0x759', receiver_address: '0xabc', amount: "0.1 Eth" },
    { sender_address: '0x719', receiver_address: '0xa9c', amount: "0.15 Eth" },
    { sender_address: '0x8259', receiver_address: '0xb50c', amount: "1.9 Eth" },
    { sender_address: '0x8681', receiver_address: '0xa5063c', amount: "13 Eth" },
    { sender_address: '0x8750c', receiver_address: '0xa5303c', amount: "5.3 Eth" },
    { sender_address: '0x123b', receiver_address: '0x456c', amount: "1.4 Eth" },
    { sender_address: '0x789a', receiver_address: '0xabca',amount: "0.3 Eth" },
    { sender_address: '0x78x9', receiver_address: '0xa9ct',amount: "0.8 Eth" },
    { sender_address: '0x859x', receiver_address: '0xa50cz', amount:"0.9 Eth" },
    { sender_address: '0x8591', receiver_address: '0xa503c', amount: "0.5 Eth" },
    { sender_address: '0x8290', receiver_address: '0xa503c', amount: "0.7 Eth" },
    { sender_address: '0x8750c', receiver_address: '0xa503c', amount: "5.3 Eth" },
    { sender_address: '0x8750c', receiver_address: '0xabca', amount: "5.3 Eth" }


  ];

  useEffect(() => {
    
    console.log("This is wallet id update"+walletId)
    //Fill container with graph
    const container = graphRef.current.parentElement;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    d3.select(graphRef.current).select("svg").remove();
    const svg = d3.select(graphRef.current)
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`) 
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .append('g')
      

    const nodes = [];
    const links = [];

    data.forEach((transaction) => {
        const senderNode = nodes.find(node => node.id === transaction.sender_address);
        const receiverNode = nodes.find(node => node.id === transaction.receiver_address);
      
        if (!senderNode) {
          nodes.push({ id: transaction.sender_address });
        }
        if (!receiverNode) {
          nodes.push({ id: transaction.receiver_address });
        }
      
        links.push({ source: transaction.sender_address, target: transaction.receiver_address });
      
      });

    const graphData = { nodes, links };
    //draws lines between nodes
    const link = svg
      .selectAll('path')
      .data(graphData.links)
      .enter()
      .append('path')
      .attr('d', (d) => `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`)
      .style('stroke', '#69b3a2')
      .style('stroke-width', 5);
    
      //defines tooltips then modified by mouseover
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);


  
  const node = svg
    .selectAll('circle')
    .data(graphData.nodes)
    .enter()
    .append('circle')
    .attr('r', 20)
    .style('fill', '#69b3a2')
    .attr('cx', width / 2)
    .attr('cy', height / 2)
    
    //mouse over trigger for tooltips
    .on('mouseover', function(event, d) {
      console.log("Mouse over", d);  
      tooltip.transition()
        .duration(200)
        .style("opacity", .9);
      tooltip.html("Wallet ID: " + d.id)
        .style("left", (event.pageX + 5) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(event, d) {
      console.log("Mouse out", d);  // Debugging line
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });
  
    const simulation = d3.forceSimulation(graphData.nodes)
      .force('link', d3.forceLink().id((d) => d.id).links(graphData.links).distance(150).strength(0.2))
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('end', () => {
        spread_nodes_center_on_search();

        // Call the function again if walletId has changed
        if (walletId !== previousWalletId.current) {
          spread_nodes_center_on_search();
        }

        // Update the previousWalletId ref
        previousWalletId.current = walletId;
      });
  
    // Call spread_nodes_center_on_search whenever walletId changes
    console.log("Testing that it was called at all")
    spread_nodes_center_on_search();

      //distributes nodes and centeres them on the searched for node
    function spread_nodes_center_on_search() {
        console.log("Testing Spread Nodes")
        link.attr('d', (d) => `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`);
        node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);
    
        const centerNode = graphData.nodes.find((node) => node.id === walletId);
        if (centerNode) {
            const dx = width / 2 - centerNode.x;
            const dy = height / 2 - centerNode.y;
    
            // Update transform attribute of 'g' element.
            svg.attr('transform', `translate(${margin.left + dx},${margin.top + dy})`);
        }
    }


  }, [walletId]);

  return (
    <div className='flex flex-col justify-center items-center w-full h-[100vh]'>
        <div 
        id='graphcontainer' 
        className='w-4/6 h-[80vh] pl-1 bg-[#ffffff33] border-[#ffffffee] rounded-lg grid place-items-center -mt-20' 
        ref={graphRef} 
        />
    <DataTable data={data} />
    </div>
  );
};

export default Graph;
