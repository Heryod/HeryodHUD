ESX = nil
local isChange = false

TriggerEvent('esx:getSharedObject', function(obj) 
    ESX = obj
end)

Citizen.CreateThread(function()
    SetRadarZoom(1150)
    while true do 
        Citizen.Wait(250)
        

        if not IsMinimapRendering() or IsPauseMenuActive() then 
            SendNUIMessage ({
                action = 'close'
            })
            isChange = true
        else
            local playerPed = PlayerPedId()
            local player = PlayerId()

            local playerHP = GetEntityHealth(playerPed)
            local playerArmor = GetPedArmour(playerPed)

            local playerStamina = GetPlayerSprintStaminaRemaining(player)

            TriggerEvent('esx_status:getStatus', 'hunger', function(hunger)
                TriggerEvent('esx_status:getStatus', 'thirst', function(thirst)
                    hungerPercent = hunger.getPercent()
                    thirstPercent = thirst.getPercent()
                end)
            end)

            --print(playerHP, playerArmor, playerStamina, hungerPercent, thirstPercent)

            SendNUIMessage ({
                action = 'update',
                playerHP = playerHP,
                playerArmor = playerArmor,
                playerStamina = playerStamina,
                hungerPercent = hungerPercent,
                thirstPercent = thirstPercent
            })

            if isChange then 
                SendNUIMessage ({
                    action = 'show'
                })
            end
            isChange = false
        end
    end
end)