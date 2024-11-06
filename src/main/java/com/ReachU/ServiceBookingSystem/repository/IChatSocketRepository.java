package com.ReachU.ServiceBookingSystem.repository;

import java.util.List;

import com.ReachU.ServiceBookingSystem.entity.ChatMessageModel;

public interface IChatSocketRepository {
    public int save(ChatMessageModel chatMessageModel);
    public List<ChatMessageModel> findByRoomId(String roomId);
}